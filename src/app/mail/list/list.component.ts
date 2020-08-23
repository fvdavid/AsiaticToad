import { Component, OnInit, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  // displayedColumns: string[] = ['select', 'star', 'name', 'subject', 'when'];
  displayedColumns: string[] = ['subject', 'when'];
  dataSource: any = new MatTableDataSource([]);
  selection = new SelectionModel(true, []);

  @Input()
  set mails(val) {
    this.dataSource = new MatTableDataSource(val);
  }

  @Output() onOpenMailDetial = new EventEmitter();

  @ViewChild(MatPaginator, { static: false }) pagination: MatPaginator;

  constructor() { }

  ngOnInit() { }

  // isAllSelected() {
  //   const numberSelected = this.selection.selected.length;
  //   console.log('numberSelected: ' + numberSelected);

  //   const numRows = this.dataSource.data.length;
  //   return numberSelected === numRows;
  // }

  // masterToggle() {
  //   this.isAllSelected() ?
  //     this.selection.clear : this.dataSource.data.forEach(row => this.selection.select(row));
  // }

  rowSelection(row) {
    console.log('rowSelection-row.subject >> ' + row.subject);
    this.onOpenMailDetial.emit(row);
  }
}
