import { Component, inject, OnInit, signal, ViewChild, ElementRef } from '@angular/core';
import { AdminService } from '../../../core/services/admin-service';
import { User } from '../../../types/User';

@Component({
  selector: 'app-user-management',
  imports: [],
  templateUrl: './user-management.html',
  styleUrl: './user-management.css'
})
export class UserManagement implements OnInit{
  @ViewChild('rolesModal') rolesModal!:ElementRef<HTMLDialogElement>;
  private adminService = inject(AdminService);
  protected users = signal<User[]>([]);
  protected availableRoles=['Member','Moderator','Admin'];
  protected selectedUser:User|null = null;
  
  ngOnInit(): void {
    this.getUserWithRoles();
  }

  getUserWithRoles(){
    this.adminService.getUserWithRoles().subscribe({
      next:users=>this.users.set(users)
    })
  }

  openRolesModal(user:User){
    this.selectedUser = user;
    this.rolesModal.nativeElement.showModal();
  }


}
