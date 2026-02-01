export interface Service {
  serviceName: string;
  description: string;
  price: number;
  bookingLink: string;
}

export interface ServiceCategory {
  categoryName: string;
  sectionId: string;
  services: Service[];
}
