import { CommonService } from './common.service';
import { Pipe, PipeTransform } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Pipe({
  name: 'transformLanguage'
})
export class TransformLanguagePipe implements PipeTransform {

  constructor(private commonService: CommonService) {}
  transform(value: string, language: string, id: number): Observable<string> {
    
    if (language === 'ja') {
      
      return this.commonService.getRequest('https://pokeapi.co/api/v2/pokemon-species/' + id).pipe(
        map(result => result['names'].filter((x: any) => x.language.name === 'ja')[0].name)
      )
    }
    else {
      return of(value);
    }
  }

  // this.value =  result['names'].filter((x: any) => x.language.name === 'ja')[0].name;

}
