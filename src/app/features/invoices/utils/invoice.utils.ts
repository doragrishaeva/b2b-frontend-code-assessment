import { Dto, JobAd } from '../../../shared/models';
import { Invoice } from '../models';

export class InvoiceUtils {
	public static generateInvoice(jobAdDto: Dto<JobAd>): Dto<Invoice> {
		return {
			id: jobAdDto.id.toString(),
			jobAdId: +jobAdDto.id,
			amount: InvoiceUtils.generateRandomAmount(),
			dueDate: InvoiceUtils.getDueDate(jobAdDto.createdAt),
			createdAt: new Date(),
			updatedAt: new Date(),
		};
	}

	public static generateRandomAmount() {
		const min = 10;
		const max = 1000;
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	public static getDueDate(date: Date | string): Date {
		const publishDate = new Date(date);

		const publishMonth = publishDate.getMonth() + 1;
		const publishYear = publishDate.getFullYear();

		let dueDateMonth = publishMonth + 2;
		let dueDateYear = publishYear;

		const monthInYear = 12;

		if (dueDateMonth > monthInYear) {
			dueDateMonth -= monthInYear;
			dueDateYear += 1;
		}

		const lastDayOfDueMonth = new Date(dueDateYear, dueDateMonth, 0).getDate();
		const dueDate = new Date(dueDateYear, dueDateMonth - 1, lastDayOfDueMonth);

		return dueDate;
	}
}
