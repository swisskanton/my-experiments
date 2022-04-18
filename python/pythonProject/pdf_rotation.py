from PyPDF2 import PdfFileReader, PdfFileWriter

def rotate_pages(pdf_path):
    pdf_writer = PdfFileWriter()
    pdf_reader = PdfFileReader(pdf_path)
    # Rotate page 90 degrees to the right
    page_1 = pdf_reader.getPage(0).rotateClockwise(90)
    pdf_writer.addPage(page_1)
    page_2 = pdf_reader.getPage(1).rotateClockwise(90)
    pdf_writer.addPage(page_2)
    """
    # Rotate page 90 degrees to the left
    page_3 = pdf_reader.getPage(2).rotateCounterClockwise(90)
    pdf_writer.addPage(page_3)
    # Add a page in normal orientation
    pdf_writer.addPage(pdf_reader.getPage(3))
"""
    with open('lepedo1.pdf', 'wb') as fh:
        pdf_writer.write(fh)

if __name__ == '__main__':
    path = 'lepedo.pdf'
    rotate_pages(path)