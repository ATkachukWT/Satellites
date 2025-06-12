import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PositionService {
  private _positions = new BehaviorSubject<any[]>([]);
  
  getPositions(): Observable<any[]> {
    return this._positions.asObservable();
  }

  updatePositions(newPosition: any) {
    const formattedPosition = {
      ...newPosition,
      time: this.formatDate(newPosition.time)
    };

    const updatedPositions = [formattedPosition, ...this._positions.getValue()];
    this._positions.next(updatedPositions);
  }

  formatDate(date: Date): string {
    return date.toLocaleString('it-IT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  }

}
