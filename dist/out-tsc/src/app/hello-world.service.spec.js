import { TestBed } from '@angular/core/testing';
import { HelloWorldService } from './hello-world.service';
describe('HelloWorldService', () => {
    let service;
    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(HelloWorldService);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=hello-world.service.spec.js.map