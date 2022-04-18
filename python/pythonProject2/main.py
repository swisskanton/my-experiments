import kivy
from kivy.app import App
from kivy.uix.label import Label
from kivy.uix.gridlayout import GridLayout
from kivy.uix.textinput import TextInput
from kivy.uix.button import Button
from kivy.uix.widget import Widget
from kivy.properties import ObjectProperty

class MyGrid(Widget):
    name = ObjectProperty(None)
    email = ObjectProperty(None)

    def btn(self):
        print("Name:", self.name.text, "Email: ", self.email.text)
        self.name.text = ""
        self.email.text = ""

class MyApp(App):
    def build(self):
        return MyGrid()

if __name__ == "__main__":
    MyApp().run()





"""
# korábbi verzió

class MyGrid(GridLayout):
    def __init__(self, **kwargs):
        super(MyGrid, self).__init__(**kwargs)
        self.cols = 1

        self.inside = GridLayout()
        self.inside.cols = 2

        self.inside.add_widget(Label(text="Name: "))
        self.name = TextInput(multiline=False)
        self.inside.add_widget(self.name)

        self.inside.add_widget(Label(text="Lastname: "))
        self.last = TextInput(multiline=False)
        self.inside.add_widget(self.last)

        self.inside.add_widget(Label(text="Email: "))
        self.email = TextInput(multiline=False)
        self.inside.add_widget(self.email)

        self.add_widget(self.inside)

        self.submit = Button(text = "Submit" , font_size = 40)
        self.submit.bind(on_press = self.pressed)
        self.add_widget(self.submit)

    def pressed(self, instance):
        print(f"Firstame: {self.name.text}, lastmane: {self.last.text}, email: {self.email.text}")
        self.name.text = ""
        self.last.text = ""
        self.email.text = ""

class MyApp(App):
    def build(self):
        return MyGrid()


if __name__ == '__main__':
    MyApp().run()
"""