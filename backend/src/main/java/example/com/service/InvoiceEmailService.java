package example.com.service;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import example.com.model.Orders;
import example.com.model.PaymentEntity;

import java.io.ByteArrayOutputStream;

@Service
public class InvoiceEmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private PdfGenerator pdfGenerator;

    public void sendInvoiceEmail(PaymentEntity payment, Orders order) throws MessagingException {
        try {
            // Generate PDF in memory
            ByteArrayOutputStream pdfStream = new ByteArrayOutputStream();
            pdfGenerator.generateInvoice(payment, order, pdfStream);

            // Prepare email
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo(order.getEmail());
            helper.setSubject("Your Invoice - Order #" + payment.getOrderId());
            helper.setText(
                "Dear " + order.getCustomerName() + ",\n\n" +
                "Thank you for your purchase! Please find your invoice attached.\n\n" +
                "Regards,\n Kabita"
            );

            // Attach PDF
            helper.addAttachment("invoice_" + payment.getId() + ".pdf",
                new org.springframework.core.io.ByteArrayResource(pdfStream.toByteArray()));

            // Send email
            mailSender.send(message);

        } catch (Exception e) {
            throw new MessagingException("Failed to send invoice email", e);
        }
    }
}
