import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Question } from '../types/Question';

@Injectable({
  providedIn: 'root'
})
export class GetQuestionsResolver implements Resolve<Question[]> {
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Question[]> {
    return fetch('/assets/questions.json').then(res => res.json());
  }
}
