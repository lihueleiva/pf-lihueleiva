import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fullName',
  standalone: false
})
export class FullNamePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    return value.toUpperCase();
  }

}
