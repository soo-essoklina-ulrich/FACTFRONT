import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, Validators} from '@angular/forms';
import {environment} from '../../../environments/environment';
import {Article, SaveArticle} from '../../models/Article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private url = environment.api_ulr + 'article';

  constructor(
    private http: HttpClient,
    private fb: FormBuilder
  ) { }

  createform(){
    this.fb.group({
      libelle: ['', Validators.required],
      prix_unitaire: ['', Validators.required]
    });
  }


  getArticles(){
    return this.http.get<Article>(this.url);
  }

  updateArticle(id:string, article: SaveArticle){
    return this.http.put<Article>(this.url+`/${id}`, article);
  }

  addArticle(article: SaveArticle){
    return this.http.post<Article>(this.url, article);
  }

  deleteArticle(id:string){
    return this.http.delete(this.url+`/${id}`);
  }
}