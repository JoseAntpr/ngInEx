import { Action } from '@ngrx/store';

export const ACTIVAR_LOADING = '[UI] loading...';
export const DESACTIVAR_LOADING = '[UI] End loading...';

export class ActivateLoadingAction implements Action {
    readonly type = ACTIVAR_LOADING;
}

export class DeactivateLoadingAction implements Action {
    readonly type = DESACTIVAR_LOADING;
}

export type actions =   ActivateLoadingAction |
                        DeactivateLoadingAction;
