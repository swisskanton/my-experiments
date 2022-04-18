import PyPDF2
import tabula
"""
pdfFileObj = open('example.pdf', 'rb')
pdfReader = PyPDF2.PdfFileReader(pdfFileObj)
print(pdfReader.numPages)
pageObj = pdfReader.getPage(0)
print(pageObj.extractText())
pdfFileObj.close()
"""
#df = tabula.read_pdf("example.pdf", pages = "all")
#print(df)

#ez a rész nem teljesen jól működik
#létrehozza az example.csv fájlt, de az adatok benne nem teljesen
tabula.convert_into("example.pdf", "example_test.csv", output_format="csv")