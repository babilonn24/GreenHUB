import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiUsuarioComponent } from './mi-usuario.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MiUsuarioComponent', () => {
  let component: MiUsuarioComponent;
  let fixture: ComponentFixture<MiUsuarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,    
      ], 
      declarations: [MiUsuarioComponent]
    });
    fixture = TestBed.createComponent(MiUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
