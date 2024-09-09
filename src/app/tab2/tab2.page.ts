import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  appliances = [
    { name: 'Microondas', kWh: 0.8, costPerHour: 3, image: 'assets/images/microwave.png' },
    { name: 'Lavadora', kWh: 9.4, costPerHour: 1441, image: 'assets/images/washing-machine.png' },
    { name: 'Refrigerador', kWh: 7.6, costPerHour: 1794, image: 'assets/images/fridge.png' },
  ];

  currentDate = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

 // Datos resumen
 totalKw = 0;
 costPerMonth = 0;
 totalCost = 0;

 ngOnInit() {
   this.calculateSummary();
 }

 calculateSummary() {
   // Calcular el total de kWh y costo
   this.totalKw = this.appliances.reduce((sum, appliance) => sum + appliance.kWh, 0);
   this.costPerMonth = this.appliances.reduce((sum, appliance) => sum + appliance.costPerHour, 0);

   // Calcular los costos basados en el total de kWh
   this.costPerMonth = this.costPerMonth; // 
   this.totalCost = this.costPerMonth;
}

}
