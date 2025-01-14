import {Component, OnInit} from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import {Router} from '@angular/router';
import {ButtonDirective} from 'primeng/button';
import {Ripple} from 'primeng/ripple';

@Component({
  selector: 'app-mydynamicdialog',
  standalone: true,
  imports: [
    ButtonDirective,
    Ripple
  ],
  templateUrl: './mydynamicdialog.component.html',
  styleUrl: './mydynamicdialog.component.css'
})
export class MydynamicdialogComponent implements OnInit {

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  close(){
    this.ref.close(
      this.router.navigate(['/auth']).then(r => console.log(r))
    );
  }

}
