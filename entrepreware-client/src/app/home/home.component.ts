import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { VerifyRes } from '../interfaces/verify.interface';
import { AuthService } from "../services/auth.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) { }

  client: FormGroup = this.fb.group({
    phone: ["", [Validators.required, Validators.minLength(11)]]
  })

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.auth.verifyPhone(this.client.get("phone").value)
      .subscribe(
       async (res: VerifyRes) => {
          const swal = (await import("sweetalert2")).default;
          let title, text;
          if (res.valid) {
            title = "Phone number is Valid";
            text = "You can proceed with your process";
          } else {
            title = "Phone number is Not Valid";
            text = "Please check your phone number and country code";
          }

          swal.fire({
            title: title,
            text: text,
            icon: res.valid ? "success" : "error",
            confirmButtonText: "Head to History",
            denyButtonText: "Done",
            showDenyButton: true,
            showConfirmButton: true
          })
          .then(value => {
            if (value.isConfirmed) {
              this.router.navigate(["/history"])
            } else if (value.isDenied) {
              
            }
          })
        });
  }

}
