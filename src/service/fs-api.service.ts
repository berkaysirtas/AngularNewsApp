import { Haberler } from '../models/Haberler';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Category } from 'src/models/Category';
import { Kullanicilar } from 'src/models/Kullanicilar';

@Injectable({
  providedIn: 'root'
})
export class FsApiService {
  OturumKontrol() {
    throw new Error("Method not implemented.");
  }

  constructor(
    private afs: AngularFirestore
  ) { }

  //#region Category
  CategoryGetir() {
    return this.afs.collection("kategoriler").snapshotChanges();
  }
  CategoryByIdGetir(id: string) {
    return this.afs.collection("kategoriler").doc(id).valueChanges();
  }
  CategoryEkle(Kategori: Category) {
    delete Kategori.id // burdasın
    return this.afs.collection("kategoriler").add(Kategori);
  }
  CategoryDuzenle(Kategori: Category) {
    return this.afs.collection("kategoriler").doc(Kategori.id).update(Kategori);
  }
  CategorySil(id: string) {
    return this.afs.collection("kategoriler").doc(id).delete();
  }

  //#region Odev
  HaberGetir() {
    return this.afs.collection("haberler").snapshotChanges();
  }
  HaberByIdGetir(id: string) {
    return this.afs.collection("haberler", q => q.where("categoryId", "==", id)).snapshotChanges();
  }
  HaberEkle(haberler: Haberler) {
    delete haberler.id
    return this.afs.collection("haberler").add(haberler);
  }
  HaberDuzenle(haberler: Haberler) {
    return this.afs.collection("haberler").doc(haberler.id).update(haberler);
  }
  HaberSil(id: string) {
    return this.afs.collection("haberler").doc(id).delete();
  }

  //Haber Detay
  DetayByHaberId(haberId: string) {
    return this.afs.collection("haberler", q => q.where("id", "==", haberId)).snapshotChanges();
  }


    //#kullanici Odev
    KullaniciGetir() {
      return this.afs.collection("kullanicilar").snapshotChanges();
    }
    // KullaniciByIdGetir(id: string) {
    //   return this.afs.collection("kullanicilar", q => q.where("dersId", "==", id)).snapshotChanges();
    // }
    KullaniciEkle(Kullanici: Kullanicilar) {
      delete Kullanici.id
      return this.afs.collection("kullanicilar").add(Kullanici);
    }
    KullaniciDuzenle(Kullanici: Kullanicilar) {
      return this.afs.collection("kullanicilar").doc(Kullanici.id).update(Kullanici);
    }
    KullaniciSil(id: string) {
      return this.afs.collection("kullanicilar").doc(id).delete();
    }


}
