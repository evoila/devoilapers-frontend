export * from './account.service';
import { AccountService } from './account.service';
export * from './service.service';
import { ServiceService } from './service.service';
export * from './servicestore.service';
import { ServicestoreService } from './servicestore.service';
export const APIS = [AccountService, ServiceService, ServicestoreService];
