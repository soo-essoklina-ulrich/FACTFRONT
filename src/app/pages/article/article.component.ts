import { Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Article } from '../../models/Article';
import { ArticleService } from '../../services/article/article.service';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { ParamRequestion } from '../../models/pagination/ParamRequestion';
import { TableGenericComponent } from '../../layout/component/table-generic/table-generic.component';

import { injectQuery } from '@tanstack/angular-query-experimental';

import { defaultColumn } from './article-list';
import { lastValueFrom } from 'rxjs';

@Component({
    selector: 'app-article',
    imports: [ReactiveFormsModule, Toast, TableGenericComponent],
    templateUrl: './article.component.html',
    styleUrl: './article.component.scss',
    providers: [MessageService],
})
export class ArticleComponent implements OnInit {
    // pagination
    pagintion: ParamRequestion = { page: 1, pagesize: 10 };
    visibleaddmoal: boolean = false;
    columns = defaultColumn;

    protected form!: FormGroup;

    protected article!: Article;
    loading: boolean = true;
    protected visibleeditmoal: boolean = false;

    query = injectQuery(() => ({
        queryKey: ['articles'],
        queryFn: () => lastValueFrom(this.ArticleService.getArticles(this.pagintion)),
    }));

    constructor(
        private ArticleService: ArticleService,
        private messageService: MessageService
    ) {}

    ngOnInit(): void {
        this.createform();
        // this.getArticles();
    }

    createform() {
        this.form = this.ArticleService.createform();
    }

    // getArticles() {
    //     this.loading = true;
    //     setTimeout(() => {
    //         this.ArticleService.getArticles(this.pagintion).subscribe(
    //             (res) => {
    //                 this.articlesListo = this.articlesList = res.content;
    //                 this.loading = false;
    //                 this.messageService.add({
    //                     severity: 'success',
    //                     summary: 'Success',
    //                     detail: 'Articles Charge successfully',
    //                 });
    //             },
    //             (err) => {
    //                 console.log(err);
    //                 this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.detail });
    //             }
    //         );
    //     }, 3000);
    // }

    // OnSubmit() {
    //     this.ArticleService.addArticle(this.form.value).subscribe(
    //         (res) => {
    //             this.articlesList.push(res);
    //             this.articlesListo = this.articlesList;
    //             this.visibleaddmoal = false;
    //             this.form.reset();
    //             this.messageService.add({
    //                 severity: 'success',
    //                 summary: 'Success',
    //                 detail: 'Article added successfully',
    //             });
    //         },
    //         (err) => {
    //             this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.detail });
    //         }
    //     );
    // }

    // UpdataeArticle() {
    //     this.ArticleService.updateArticle(this.article.id, this.form.value).subscribe(
    //         (res) => {
    //             this.articlesList = this.articlesList.map((article) => (article.id === this.article.id ? res : article));
    //             this.articlesListo = this.articlesList;
    //             this.visibleeditmoal = false;
    //             this.form.reset();
    //             this.messageService.add({
    //                 severity: 'success',
    //                 summary: 'Success',
    //                 detail: 'Article updated successfully',
    //             });
    //         },
    //         (err) => {
    //             this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.detail });
    //         }
    //     );
    // }

    // deleteArticle(id: string) {
    //     this.ArticleService.deleteArticle(id).subscribe(
    //         (res) => {
    //             this.articlesListo = this.articlesList = this.articlesList.filter((article) => article.id !== id);
    //             this.messageService.add({
    //                 severity: 'success',
    //                 summary: 'Success',
    //                 detail: 'Article deleted successfully',
    //             });
    //         },
    //         (err) => {
    //             this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.detail });
    //         }
    //     );
    // }

    // filterGlobal($event: Event) {
    //     const value = ($event.target as HTMLInputElement).value;
    //
    //     if (value.length > 0) {
    //         this.articlesList = this.articlesList.filter((article) => article.libelle.toLowerCase().includes(value.toLowerCase()));
    //     } else {
    //         this.articlesList = this.articlesListo;
    //     }
    // }
    //
    // editArticle(id: string) {
    //     this.article = this.articlesList.find((article) => article.id === id)!;
    //     this.form.patchValue(this.article);
    //     this.visibleeditmoal = true;
    // }

    showAddArticleModal() {
        this.visibleaddmoal = true;
    }
}
