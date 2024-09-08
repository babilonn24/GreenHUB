import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarUsuarioComponent } from './modificar-usuario.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';

describe('ModificarUsuarioComponent', () => {
  let component: ModificarUsuarioComponent;
  let fixture: ComponentFixture<ModificarUsuarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,  
        RouterTestingModule,
        FormsModule
      ], 
      declarations: [ModificarUsuarioComponent]
    });
    fixture = TestBed.createComponent(ModificarUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
