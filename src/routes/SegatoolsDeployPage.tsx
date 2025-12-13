import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { fetchTrustStatus, deploySegatools, rollbackSegatools } from '../api/trustedApi';
import { SegatoolsTrustStatus } from '../types/trusted';
import { useGamesState } from '../state/gamesStore';
import { useToast, ToastContainer } from '../components/common/Toast';
import { ConfirmDialog } from '../components/common/ConfirmDialog';

function SegatoolsDeployPage() {
  const { t } = useTranslation();
  const { games, activeGameId } = useGamesState();
  const [status, setStatus] = useState<SegatoolsTrustStatus | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [deploying, setDeploying] = useState<boolean>(false);
  const [rollbacking, setRollbacking] = useState<boolean>(false);
  const [confirming, setConfirming] = useState<boolean>(false);
  const [pendingFiles, setPendingFiles] = useState<string[]>([]);
  const { toasts, showToast } = useToast();

  const activeGame = useMemo(() => games.find(g => g.id === activeGameId), [games, activeGameId]);

  const loadStatus = async () => {
    setLoading(true);
    try {
      const res = await fetchTrustStatus();
      setStatus(res);
    } catch (err) {
      showToast(t('deploy.statusError', { error: String(err) }), 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStatus();
  }, [activeGameId]);

  const runDeploy = async (force: boolean) => {
    setDeploying(true);
    try {
      const res = await deploySegatools(force);
      if (res.needs_confirmation) {
        setPendingFiles(res.existing_files || []);
        setConfirming(true);
        return;
      }
      if (res.deployed) {
        setStatus(res.verification || await fetchTrustStatus());
        showToast(res.message || t('deploy.deployOk'), 'success');
      } else {
        showToast(res.message || t('deploy.deployUnknown'), 'warning');
      }
    } catch (err) {
      showToast(t('deploy.deployError', { error: String(err) }), 'error');
    } finally {
      setDeploying(false);
    }
  };

  const onRollback = async () => {
    setRollbacking(true);
    try {
      const res = await rollbackSegatools();
      setStatus(res.verification || await fetchTrustStatus());
      showToast(res.message || t('deploy.rollbackOk'), 'success');
    } catch (err) {
      showToast(t('deploy.rollbackError', { error: String(err) }), 'error');
    } finally {
      setRollbacking(false);
    }
  };

  if (loading) {
    return (
      <div className="empty-state">
        <h3>{t('deploy.loading')}</h3>
      </div>
    );
  }

  if (!activeGameId) {
    return (
      <div className="empty-state">
        <h3>{t('deploy.noActiveGame')}</h3>
        <p>{t('deploy.activateFirst')}</p>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <div>
          <h2 style={{ margin: '0 0 4px 0' }}>{t('deploy.title')}</h2>
          <small>{t('deploy.subtitle')}</small>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontWeight: 600, color: status?.trusted ? 'var(--success)' : 'var(--warning)' }}>
            {status?.trusted ? t('deploy.trusted') : status?.missing_files ? t('deploy.missing') : t('deploy.untrusted')}
          </div>
          {status?.build_id && <div style={{ color: 'var(--text-muted)', fontSize: 12 }}>{t('deploy.buildId', { build: status.build_id })}</div>}
        </div>
      </div>

      {status && (
        <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', padding: 12, borderRadius: 8, marginBottom: 12 }}>
          <div style={{ marginBottom: 8 }}>
            <strong>{t('deploy.currentGame')}</strong> {activeGame ? activeGame.name : ''}
          </div>
          {!status.trusted && (
            <div style={{ color: 'var(--danger)', marginBottom: 8 }}>
              {status.missing_files ? t('deploy.missingDetail') : t('deploy.untrustedDetail')}
              {status.reason ? ` ${t('deploy.reason', { reason: status.reason })}` : ''}
            </div>
          )}
          <div style={{ display: 'grid', gap: 6 }}>
            {status.checked_files.map((f) => (
              <div key={f.path} style={{ display: 'flex', justifyContent: 'space-between', border: '1px solid var(--border-color)', padding: 8, borderRadius: 6 }}>
                <span>{f.path}</span>
                <span style={{ color: f.matches ? 'var(--success)' : 'var(--danger)' }}>
                  {f.matches ? t('deploy.hashOk') : t('deploy.hashMismatch')}
                </span>
              </div>
            ))}
            {status.checked_files.length === 0 && (
              <div style={{ color: 'var(--text-muted)' }}>{t('deploy.noHashes')}</div>
            )}
          </div>
        </div>
      )}

      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <button onClick={() => runDeploy(false)} disabled={deploying}>{deploying ? t('deploy.deploying') : t('deploy.deploy')}</button>
        <button onClick={onRollback} disabled={rollbacking || !status?.has_backup}>{rollbacking ? t('deploy.rollingBack') : t('deploy.rollback')}</button>
        <button onClick={loadStatus}>{t('deploy.refresh')}</button>
      </div>

      {confirming && (
        <ConfirmDialog
          title={t('deploy.confirmTitle')}
          message={t('deploy.confirmMessage', { count: pendingFiles.length, files: pendingFiles.slice(0, 5).join(', ') })}
          onConfirm={() => { setConfirming(false); runDeploy(true); }}
          onCancel={() => setConfirming(false)}
          isDangerous={true}
        />
      )}
      <ToastContainer toasts={toasts} />
    </div>
  );
}

export default SegatoolsDeployPage;
