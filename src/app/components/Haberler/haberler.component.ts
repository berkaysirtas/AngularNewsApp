import { Component, OnInit } from '@angular/core';
import { FsApiService } from 'src/service/fs-api.service';
import { Category } from 'src/models/Category';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Modal } from 'bootstrap';
import * as bootstrap from 'bootstrap';
import { HotToastModule, HotToastService } from '@ngneat/hot-toast';
import { Haberler, } from 'src/models/Haberler';
import { AuthService } from 'src/service/auth.service';





@Component({
  selector: 'app-haberler',
  templateUrl: './haberler.component.html',
  styleUrls: ['./haberler.component.scss']
})
export class HaberlerComponent implements OnInit {
  haberler!: Haberler[];
  kategoriler!: Category[];
  haberKayit!: Haberler;
  modal!: Modal;
  modalBaslik: string = "";
  secHaber!: Haberler;
  categoryId: string = "";


  frm: FormGroup = new FormGroup({
    id: new FormControl(),
    haberadi: new FormControl(),
    detail: new FormControl(),
    resim: new FormControl(),
    categoryId: new FormControl(),
  });
  route: any;


  constructor(
    public formBuilder: FormBuilder,
    private afs: FsApiService,
    private authService: AuthService,
    private toastr: HotToastService



  ) { }

  ngOnInit(): void {
    if (this.categoryId != "") {
      this.route.params.subscribe((p: any) => {
        if (p.katId) {
          this.categoryId = p.categoryId;
          this.CategoryGetir();
        }
      });
    }
    //Sayfa Güvenligini burdda kontrol ediyoruz
    if (this.authService.OturumKontrol() == false) {
      location.href = "/giris";
    }
    this.CategoryGetir();
    this.HaberGetir();
  }


  Ekle(el: HTMLElement) {
    this.frm.reset();
    this.modal = new bootstrap.Modal(el);
    this.modal.show();
  }
  Duzenle(haber: Haberler, el: HTMLElement) {
    this.frm.patchValue(haber);
    this.modal = new bootstrap.Modal(el);
    this.modal.show();
  }
  Sil(haber: Haberler, el: HTMLElement) {
    this.secHaber = haber;
    this.modal = new bootstrap.Modal(el);
    this.modal.show();
  }

  haberEkleDuzenle() {
    var haber: Haberler = this.frm.value
    var tarih = new Date();
    if (!haber.id) {
      haber.kayittarihi = tarih.getTime().toString();
      haber.duzenlenmetarihi = tarih.getTime().toString();
      this.afs.HaberEkle(haber).then(e => {
        this.HaberGetir();
        this.modal.toggle();
        this.toastr.success('Başarılı Bir Şekilde Eklendi', {
          duration: 2000,
          style: {
            border: '1px solid #00ff22',
            padding: '16px',
            color: '#00ff22',
          },
          iconTheme: {
            primary: '#00ff22',
            secondary: '#FFFAEE',
          },
        });
      });
    }
    else {
      haber.duzenlenmetarihi = tarih.getTime().toString();
      this.afs.HaberDuzenle(haber).then(e => {
        this.HaberGetir();
        this.modal.toggle();
        this.toastr.success('Başarılı Bir Şekilde Güncellendi', {
          duration: 2000,
          style: {
            border: '1px solid #00ff22',
            padding: '16px',
            color: '#00ff22',
          },
          iconTheme: {
            primary: '#00ff22',
            secondary: '#FFFAEE',
          },
        });
      });
    }
  }


  HaberSil() {
    this.afs.HaberSil(this.secHaber.id!).then(e => {
      this.HaberGetir();
      this.modal.toggle();
      this.toastr.success('Başarılı Bir Şekilde Silin', {
        duration: 2000,
        style: {
          border: '1px solid #00ff22',
          padding: '16px',
          color: '#00ff22',
        },
        iconTheme: {
          primary: '#00ff22',
          secondary: '#FFFAEE',
        },
      });
    });
  }




  CategorySec(categoryId: string) {
    this.categoryId = categoryId;
    this.HaberGetir();
  }



  HaberGetir() {
    if (this.categoryId != "" && this.categoryId != "Tüm Kategoriler") {
      this.afs.HaberByIdGetir(this.categoryId).subscribe((data: any) => {
        this.haberler = data.map((e: any) => {
          return {
            id: e.payload.doc.id,
            haberadi: e.payload.doc.data().haberadi,
            resim: e.payload.doc.data().resim,
            detail: e.payload.doc.data().detail,
            ...e.payload.doc.data()

          } as Category 
        });
      })
    }
    else {
      this.afs.HaberGetir().subscribe((data: any) => {
        this.haberler = data.map((e: any) => {
          return {
            id: e.payload.doc.id,
            haberadi: e.payload.doc.data().haberadi,
            detail: e.payload.doc.data().detail,
            resim: e.payload.doc.data().resim,
            ...e.payload.doc.data()

          } as Category
        });
      })
    }

  }

  CategoryGetir() {
    this.afs.CategoryGetir().subscribe((data: any) => {
      this.kategoriler = data.map((e: any) => {
        return {
          id: e.payload.doc.id,
          kategoriadi: e.payload.doc.data().kategoriadi,
          ...e.payload.doc.data()

        } as Category
      });
    })
  }

}
