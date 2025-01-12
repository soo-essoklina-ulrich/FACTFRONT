import {Component, OnInit} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {Article} from '../../models/Article';
import {ArticleService} from '../../services/article/article.service';
import {ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api';
import {TableModule} from 'primeng/table';
import {IconFieldModule} from 'primeng/iconfield';
import {InputIconModule} from 'primeng/inputicon';
import {InputTextModule} from 'primeng/inputtext';
import {Button, ButtonDirective} from 'primeng/button';
import {Ripple} from 'primeng/ripple';
import {DialogModule} from 'primeng/dialog';
import {TooltipModule} from 'primeng/tooltip';
import {NgIf} from '@angular/common';


@Component({
  selector: 'app-article',
  standalone: true,
  imports: [
    ToastModule,
    TableModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    DialogModule,
    Button,
    TooltipModule,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './article.component.html',
  styleUrl: './article.component.css',
  providers: [
    MessageService
  ]
})
export class ArticleComponent implements OnInit {

  visibleaddmoal: boolean = false;

  protected form!: FormGroup;
  protected articlesListo: Article[] = [];
  protected articlesList: Article[] = [];
  protected article!: Article;
  loading: boolean = true;
  protected visibleeditmoal: boolean = false;


  constructor(
    private ArticleService: ArticleService,
    private messageService: MessageService
  ) {
  }

  ngOnInit(): void {
    this.createform()
    this.getArticles();
  }


  createform() {
    this.form = this.ArticleService.createform();
  }

  getArticles() {
    this.ArticleService.getArticles().subscribe(
      (res) => {
        this.articlesListo = this.articlesList = res;
        this.loading = false;
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'Articles Charge successfully'});
      },
      (err) => {
        console.log(err);
        this.messageService.add({severity: 'error', summary: 'Error', detail: err.error.detail});
      }
    );
  }

  OnSubmit() {
    this.ArticleService.addArticle(this.form.value).subscribe(
      (res) => {
        this.articlesList.push(res);
        this.articlesListo = this.articlesList;
        this.visibleaddmoal = false;
        this.form.reset();
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'Article added successfully'});
      },
      (err) => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: err.error.detail});
      }
    );
  }

  UpdataeArticle() {
    this.ArticleService.updateArticle(this.article.id, this.form.value).subscribe(
      (res) => {
        this.articlesList = this.articlesList.map((article) => article.id === this.article.id ? res : article);
        this.articlesListo = this.articlesList;
        this.visibleeditmoal = false;
        this.form.reset();
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'Article updated successfully'});
      },
      (err) => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: err.error.detail});
      }
    );
  }

  deleteArticle(id: string) {
    this.ArticleService.deleteArticle(id).subscribe(
      (res) => {
        this.articlesList = this.articlesList.filter((article) => article.id !== id);
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'Article deleted successfully'});
      },
      (err) => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: err.error.detail});
      }
    );
  }

  filterGlobal($event: Event) {
    const value = ($event.target as HTMLInputElement).value;

    if (value.length > 0) {
      this.articlesList = this.articlesList.filter((article) => article.libelle.toLowerCase().includes(value.toLowerCase()));
    } else {
      this.articlesList = this.articlesListo;
    }
  }

  editArticle(id: string) {
    this.article = this.articlesList.find((article) => article.id === id)!;
    this.form.patchValue(this.article);
    this.visibleeditmoal = true;
  }

  showAddArticleModal() {
    this.visibleaddmoal = true;
  }

}
