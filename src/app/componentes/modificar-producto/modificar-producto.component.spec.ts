import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarProductoComponent } from './modificar-producto.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';

describe('ModificarProductoComponent', () => {
  let component: ModificarProductoComponent;
  let fixture: ComponentFixture<ModificarProductoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,    
        RouterTestingModule,
        FormsModule
      ], 
      declarations: [ModificarProductoComponent]
    });
    fixture = TestBed.createComponent(ModificarProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
