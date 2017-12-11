import { Observable } from 'rxjs/Observable';
import { IBossControlOption } from '../contorl-components/IBossControlOption';


export interface IBossOptionProvider {
  options: Observable<IBossControlOption[]>;
}
