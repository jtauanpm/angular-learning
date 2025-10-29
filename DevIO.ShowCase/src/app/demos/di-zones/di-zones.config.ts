import { InjectionToken } from "@angular/core";

export interface DiZonesConfig {
    token: string;
}

export const DI_ZONES_CONFIG = new InjectionToken<DiZonesConfig>("DI_ZONES_CONFIG");