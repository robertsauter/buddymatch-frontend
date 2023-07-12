import { Pipe, PipeTransform } from '@angular/core';

// Returns the first character of a string
@Pipe({
  name: 'firstLetter'
})
export class FirstLetterPipe implements PipeTransform {
    transform(word: string): string {
        return word.split('')[0];
    }
}