import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LucideCircleCheck } from '@lucide/angular';

@Component({
  selector: 'app-sugerir-personaje',
  imports: [ReactiveFormsModule, LucideCircleCheck],
  templateUrl: './sugerir-personaje.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SugerirPersonaje {
  private readonly fb = inject(FormBuilder).nonNullable;

  protected readonly enviado = signal<string | null>(null);
  protected readonly razas = ['Saiyan', 'Human', 'Namekian', 'Android', 'Majin', 'Otra'];

  protected readonly form = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    raza: ['Saiyan', Validators.required],
    correo: ['', [Validators.required, Validators.email]],
    motivo: ['', [Validators.maxLength(200)]],
  });

  protected enviar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    // getRawValue() está tipado: { nombre: string; raza: string; ... }
    const datos = this.form.getRawValue();
    this.enviado.set(datos.nombre);
    this.form.reset();
  }

  protected tieneError(campo: keyof typeof this.form.controls, error: string) {
    const c = this.form.controls[campo];
    return c.touched && c.hasError(error);
  }
}
