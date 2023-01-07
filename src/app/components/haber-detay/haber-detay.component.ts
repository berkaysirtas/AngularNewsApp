import { Component, OnInit } from '@angular/core';
import { FsApiService } from 'src/service/fs-api.service';
import { Category } from 'src/models/Category';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Modal } from 'bootstrap';
import * as bootstrap from 'bootstrap';
import { HotToastModule, HotToastService } from '@ngneat/hot-toast';
import { Haberler } from 'src/models/Haberler';
import { ActivatedRoute } from '@angular/router';





@Component({
  selector: 'app-haber-detay',
  templateUrl: './haber-detay.component.html',
  styleUrls: ['./haber-detay.component.scss']
})
export class HaberDetayComponent implements OnInit {
  haberDetay: Haberler = new Haberler();
  HaberId!: string;
  

  constructor(
    public afs: FsApiService,
    public route: ActivatedRoute
  ) { }


  ngOnInit() {
    
    this.route.params.subscribe((p: any) => {
        this.HaberId = p.id;
    });
    this.HaberListele();
  

  }
  
  HaberListele() {
    this.afs.DetayByHaberId(this.HaberId).subscribe(d =>{
      d.forEach((e: any) => {
        this.haberDetay = {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as Haberler)
        } as Haberler;
      });
    });
    
  }
}


