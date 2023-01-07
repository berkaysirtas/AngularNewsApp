import { Haberler } from '../models/Haberler';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Category } from 'src/models/Category';

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



}
