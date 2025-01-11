import {Component, OnInit} from '@angular/core';
import { FormGroup } from '@angular/forms';
import {Article} from '../../models/Article';
import {ArticleService} from '../../services/article/article.service';



@Component({
  selector: 'app-article',
  standalone: true,
  imports: [],
  templateUrl: './article.component.html',
  styleUrl: './article.component.css'
})
export class ArticleComponent implements OnInit{

  visibleaddmoal:boolean = false;

  protected form!: FormGroup;
  protected articlesList: Article[] = [];

  constructor(
    private ArticleService: ArticleService,
  ) {
  }
    ngOnInit(): void {

    }

}
