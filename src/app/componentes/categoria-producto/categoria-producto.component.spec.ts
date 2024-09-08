import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaProductoComponent } from './categoria-producto.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';

describe('CategoriaProductoComponent', () => {
  let component: CategoriaProductoComponent;
  let fixture: ComponentFixture<CategoriaProductoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        FormsModule
      ], 
      declarations: [CategoriaProductoComponent]
    });
    fixture = TestBed.createComponent(CategoriaProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
