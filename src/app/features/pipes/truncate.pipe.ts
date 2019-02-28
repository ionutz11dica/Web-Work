import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'limitToPipe'
})
export class TruncatePipe implements PipeTransform {

  transform(value: string, limit: number): string {
    let trail = '...';
    if(value) {
      return value.length > limit ? value.substring(0, limit) + trail : value;
    }
  }

}
