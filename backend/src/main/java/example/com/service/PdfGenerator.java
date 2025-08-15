package example.com.service;

import com.itextpdf.text.*;
import com.itextpdf.text.pdf.*;

import example.com.model.Orders;
import example.com.model.PaymentEntity;

import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.OutputStream;
import java.text.NumberFormat;
import java.util.Locale;

@Service
public class PdfGenerator {

    public void generateInvoice(PaymentEntity payment, Orders order, OutputStream out) throws IOException {
        Document document = new Document(PageSize.A4, 50, 50, 50, 50);
        try {
            PdfWriter.getInstance(document, out);
            document.open();

            // Title
            Font titleFont = new Font(Font.FontFamily.HELVETICA, 20, Font.BOLD);
            Paragraph title = new Paragraph("Invoice / Receipt", titleFont);
            title.setAlignment(Element.ALIGN_CENTER);
            title.setSpacingAfter(20);
            document.add(title);

            // Format currency
            NumberFormat currencyFormat = NumberFormat.getCurrencyInstance(new Locale("en", "IN"));

            // Table with two columns
            PdfPTable table = new PdfPTable(2);
            table.setWidthPercentage(100);
            table.setSpacingBefore(10);
            table.setSpacingAfter(20);
            table.setWidths(new float[]{3f, 5f}); // Adjust column widths

            // Cell style
            Font headerFont = new Font(Font.FontFamily.HELVETICA, 12, Font.BOLD);
            Font valueFont = new Font(Font.FontFamily.HELVETICA, 12);
            
            addRow(table, "Order ID:", String.valueOf(payment.getOrderId()), headerFont, valueFont);
            addRow(table, "Customer Name:", order.getCustomerName(), headerFont, valueFont);
            addRow(table, "Email:", order.getEmail(), headerFont, valueFont);
            addRow(table, "Amount:", currencyFormat.format(payment.getAmount()), headerFont, valueFont);
            addRow(table, "Payment Status:", payment.getPaymentStatus(), headerFont, valueFont);
            addRow(table, "Transaction ID:", payment.getStripePaymentId(), headerFont, valueFont);

            document.add(table);

            // Footer note
            Font footerFont = new Font(Font.FontFamily.HELVETICA, 10, Font.ITALIC, BaseColor.GRAY);
            Paragraph footer = new Paragraph("Thank you for your business!", footerFont);
            footer.setAlignment(Element.ALIGN_CENTER);
            document.add(footer);

        } catch (DocumentException e) {
            throw new IOException("Error generating PDF", e);
        } finally {
            document.close();
        }
    }

    private void addRow(PdfPTable table, String key, String value, Font keyFont, Font valueFont) {
        PdfPCell cellKey = new PdfPCell(new Phrase(key, keyFont));
        cellKey.setBorderColor(BaseColor.LIGHT_GRAY);
        cellKey.setPadding(8);
        table.addCell(cellKey);

        PdfPCell cellValue = new PdfPCell(new Phrase(value != null ? value : "", valueFont));
        cellValue.setBorderColor(BaseColor.LIGHT_GRAY);
        cellValue.setPadding(8);
        table.addCell(cellValue);
    }
}
