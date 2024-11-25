import { ValveDisplay } from './valveTypes';

export interface FormEditPropsAsParams {
  params: {
    id: string;
  };
}

export type FormModeType = 'add' | 'edit';

export type InputType = 'text' | 'number';

export type ProtocolModeType = 'pdf' | 'web';

export interface ValvePDFProps {
  valve: ValveDisplay;
}
