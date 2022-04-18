from PyPDF2 import PdfFileReader, PdfFileWriter

def split(path, name_of_split):
    pdf = PdfFileReader(path)
    for page in range(pdf.getNumPages()):
        pdf_writer = PdfFileWriter()
        pdf_writer.addPage(pdf.getPage(page))

        #output = f'{name_of_split}_{page + 1}of{pdf.getNumPages()}.pdf'
        output = f'pdfs/{name_of_split}{page + 1}.pdf'
        with open(output, 'wb') as output_pdf:
            pdf_writer.write(output_pdf)

if __name__ == '__main__':
    path = 'pdfs/szavazas.pdf'
    split(path, 'szavazas')
    #path = 'pdfs/mat01.pdf'
    #split(path, 'Az_en_matematikam_')