import { ChangeDetectorRef, Component, EventEmitter, Output } from '@angular/core';
import { PositionService } from '../../services/position';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './history.html',
  styleUrl: './history.css'
})
export class History {
  positions: any[] = [];
  @Output() highlight = new EventEmitter<any>();

  constructor(private positionService: PositionService, private cdRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.positionService.getPositions().subscribe(data => {
      this.positions = [...data];
      this.cdRef.detectChanges();
    });
  }


  onMouseEnter(position: any) {
    this.highlight.emit(position);
  }

  onMouseOut(position: any) {
    
  }
}
