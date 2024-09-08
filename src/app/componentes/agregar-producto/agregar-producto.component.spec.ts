import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarProductoComponent } from './agregar-producto.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';

describe('AgregarProductoComponent', () => {
  let component: AgregarProductoComponent;
  let fixture: ComponentFixture<AgregarProductoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,    
        FormsModule
      ], 
      declarations: [AgregarProductoComponent]
    });
    fixture = TestBed.createComponent(AgregarProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
