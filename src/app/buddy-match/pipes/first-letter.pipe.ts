import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstLetter'
})
export class FirstLetterPipe implements PipeTransform {
    transform(word: string): string {
        return word.split('')[0];
    }
}