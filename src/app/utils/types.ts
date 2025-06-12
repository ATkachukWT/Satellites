export interface Satellite {
  name: string;
  line1: string;
  line2: string;
  time?: number;
  origin: 'user' | 'base';
}
