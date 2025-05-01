import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FileSizePipe } from "./file-size.pipe";
import { Component } from "@angular/core";

describe('FileSizePipe', () => {

    describe('Testa FileSizePipe.transform isolado', () => {
        const pipe = new FileSizePipe();

        it('Deve conter bytes para MB', () => {
            expect(pipe.transform('123456789')).toBe('117.74MB');
            expect(pipe.transform("987654321")).toBe("941.90MB");
        });

        it('Deve converter bytes para GB', () => {
            expect(pipe.transform('1342177280')).toBe("1.25GB");
        });
    });

    describe('Teste integração do Pipe em componente', () => {

        //Define componente de teste
        @Component({
            template:`Size: {{ size | filesize }}`,
            imports: [FileSizePipe]
        })
        class TestComponent {
            size = 123456789;
        }

        let component: TestComponent;
        let fixture: ComponentFixture<TestComponent>;
        let el: HTMLElement;

        // configura comportamento para cada it
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [
                    FileSizePipe,
                    TestComponent
                ]
            });

            fixture = TestBed.createComponent(TestComponent);
            component = fixture.componentInstance;
            el = fixture.nativeElement;
        });

        it('Deve converter bytes para MB no template HTML', () => {
            fixture.detectChanges();
            expect(el.textContent).toContain('Size: 117.74MB');

            component.size = 1029281;
            fixture.detectChanges();
            expect(el.textContent).toContain("Size: 0.98MB");
        });

        it("Deve converter bytes para GB no template HTML", () => {
          component.size = 1342177280;
          fixture.detectChanges();
          expect(el.textContent).toContain("Size: 1.25GB");
        });
    });

});