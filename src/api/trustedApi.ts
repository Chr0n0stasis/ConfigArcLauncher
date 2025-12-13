import { invokeTauri } from './tauriClient';
import { DeployResult, RollbackResult, SegatoolsTrustStatus } from '../types/trusted';

export const fetchTrustStatus = () => invokeTauri<SegatoolsTrustStatus>('segatools_trust_status_cmd');
export const deploySegatools = (force: boolean) => invokeTauri<DeployResult>('deploy_segatoools_cmd', { force });
export const rollbackSegatools = () => invokeTauri<RollbackResult>('rollback_segatoools_cmd');
