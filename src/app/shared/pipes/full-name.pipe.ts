import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fullName',
  standalone: false
})
export class FullNamePipe implements PipeTransform {

  transform(value: string, type? : 'titlecase'): string {
    

    let result = value;

  

    return result;
  }

}
