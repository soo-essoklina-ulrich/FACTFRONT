import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Toast} from "primeng/toast";
import {MessageService} from "primeng/api";
import {FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ProformaService} from "../../../services/dossier/proforma.service";
import {InputText} from "primeng/inputtext";
import {Dialog} from "primeng/dialog";
import {Article_QuantiteSave} from "../../../models/dossier/Article_Quantite";
import {Select} from "primeng/select";
import {ClientService} from "../../../services/client/client.service";
import {Client} from "../../../models/Client";
import {Projet} from "../../../models/Projet";
import {ProjetService} from "../../../services/projet/projet.service";
import {Button} from "primeng/button";
import {ArticleService} from "../../../services/article/article.service";
import {Article} from "../../../models/Article";
import {InputNumber} from "primeng/inputnumber";
import {TableModule} from "primeng/table";
import {Tooltip} from "primeng/tooltip";
import {Proforma} from "../../../models/dossier/Proforma";
import {ToggleSwitch} from "primeng/toggleswitch";

@Component({
    selector: 'app-profoma-form',
    imports: [
        Toast,
        InputText,
        ReactiveFormsModule,
        Dialog,
        Select,
        Button,
        InputNumber,
        TableModule,
        Tooltip,
        FormsModule,
        ToggleSwitch
    ],
    templateUrl: './profoma-form.component.html',
    styleUrl: './profoma-form.component.scss',
    providers: [
        MessageService
    ]
})
export class ProfomaFormComponent implements OnInit {
    @Output('proforma') proforma = new EventEmitter<Proforma | null>();
    // formulaire
    formproforma!: FormGroup;
    formarticle_quantite!: FormGroup;
    visibladdarticle_quantire: boolean = false;

    projet: boolean = true;
    client: boolean = false;
    article_quantite: Article_QuantiteSave[] = [];
    article_quantiteshow: {
        article: string,
        qt: number,
        prix: number
    }[] = [];
    // liste des clients
    clients: Client[] = [];
    // liste des projets
    projets: Projet[] = [];
    // liste des articles
    articles: Article[] = [];
    protected projetorclientchoix: boolean = false;

    constructor(
        private profromaService: ProformaService,
        private messageService: MessageService,
        private cleintService: ClientService,
        private projetService: ProjetService,
        private articleservice: ArticleService
    ) {
    }

    ngOnInit() {
        this.createform();
        this.initdata()
    }

    initdata() {
        this.projetService.getAllProjet().subscribe(
            data => {
                this.projets = data;
            },
            error => {
                console.log(error);
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Erreur de chargement des données projets'
                });
            }
        );
        this.cleintService.getClients().subscribe(
            data => {
                this.clients = data;
            },
            error => {
                console.log(error);
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Erreur de chargement des données clients'
                });
            }
        );
        this.articleservice.getArticles().subscribe(
            data => {
                this.articles = data
            },
            error => {
                console.log(error);
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Erreur de chargement des données Artiles'
                });
            }
        )
    }

    createform() {
        this.formproforma = this.profromaService.createFormProforma();
        this.formarticle_quantite = this.profromaService.createFormArticle_Quantite();
    }

    showDialogArticle_quantite() {
        this.visibladdarticle_quantire = true;
    }

    SubmitData() {
        this.profromaService.PostData(this.formproforma.value).subscribe(
            data => {
                this.proforma.emit(data)
                this.formproforma.reset();
                this.article_quantite = [];
                this.article_quantiteshow = [];
            },
            error => {
                console.log(error)
                this.messageService.add(
                    {
                        severity: 'error',
                        summary: 'Erroe',
                        detail: 'Proforma nom creer'
                    }
                )
            },
        )
    }

    AddArticle() {
        const article_quantite = {
            article_id: this.formarticle_quantite.value.article_id.id,
            quantite: this.formarticle_quantite.value.quantite,
            prix_article: this.formarticle_quantite.value.prix_article
        }
        this.article_quantite.push(article_quantite);
        this.formarticle_quantite.reset();
    }

    addarticleqttotableshow() {
        this.article_quantiteshow.push({
            article: this.formarticle_quantite.value.article_id.libelle,
            qt: this.formarticle_quantite.value.quantite,
            prix: this.formarticle_quantite.value.prix_article
        })
    }

    CloseArticleQtModal() {
        this.formarticle_quantite.reset();
        this.visibladdarticle_quantire = false;
        this.formproforma.value.articleQuantiteslist = this.article_quantite
    }

    removeArtQttoList(article: string) {
        this.article_quantiteshow = this.article_quantiteshow.filter(a => a.article != article);
    }

    // choix entre client et projet
    projetorclient() {
        this.projetorclientchoix = !this.projetorclientchoix;
    };
}
