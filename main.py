from PyQt5 import QtCore, QtWidgets, QtWebEngineWidgets, QtWebChannel, QtGui
# import mysql.connector
from PyQt5.QtCore import QVariant
import sqlite3
import json
from database import Database

import ctypes
myappid = 'mycompany.myproduct.subproduct.version'
ctypes.windll.shell32.SetCurrentProcessExplicitAppUserModelID(myappid)

db = Database()


class Backend(QtCore.QObject):
    @QtCore.pyqtSlot(int, result=int)
    def getRef(self, x):
        print("inside getRef", x)
        return x + 5

    @QtCore.pyqtSlot(result=QVariant)
    def getNotes(self):
        return QVariant(db.select('notesColor',"ORDER BY id DESC"))

    @QtCore.pyqtSlot(result=QVariant)
    def getCategories(self):
        # conn = sqlite3.connect('data.db')
        # conn.row_factory = sqlite3.Row  
        # c = conn.cursor()
        # data = c.execute('SELECT * FROM categories')
        # data = c.fetchall()
        # # data = json.dumps(data)
        # response = []
        # for row in data:
        #     # print(dict(row))
        #     response.append(dict(row))
        return QVariant(db.select('categories'))

    @QtCore.pyqtSlot(int,QVariant)
    def updateNotes(self,id,data):
        print("Data to update")
        # data = json.dumps(data)
        # data = json.loads(data)
        # print(data["note_body"])
        print(data)
        db.updateNote([data["note_title"],data["note_body"],id])

    @QtCore.pyqtSlot(QVariant,result=int)
    def addNotes(self,data):
        print("Data to insert")
        print(data)
        lastInsertId = db.addNotes([data["note_title"],data["note_body"],data["note_category"],data["color"]])
        print("lastInsertId")
        print(lastInsertId)
        return lastInsertId

    @QtCore.pyqtSlot(QVariant)
    def deleteNote(self,id):
        print("Delete Note")
        print(id)
        db.delete("notesColor",[id])

    @QtCore.pyqtSlot(QVariant,result=QVariant)
    def selectQuery(self,sql):
        return QVariant(db.selectQuery(sql))

    @QtCore.pyqtSlot(QVariant,result=int)
    def addCategory(self,data):
        print("Data to insert")
        print(data)
        lastInsertId = db.addCategory([data["category"]])
        print("lastInsertId")
        print(lastInsertId)
        return lastInsertId

    @QtCore.pyqtSlot(QVariant)
    def deleteCategory(self,id):
        print("Delete Category")
        print(id)
        db.delete("categories",[id])

if __name__ == "__main__":
    import os
    import sys

    app = QtWidgets.QApplication(sys.argv)
    app.setWindowIcon(QtGui.QIcon('note3.ico'))
    backend = Backend()

    view = QtWebEngineWidgets.QWebEngineView()

    channel = QtWebChannel.QWebChannel()
    view.page().setWebChannel(channel)
    channel.registerObject("backend", backend)

    # current_dir = os.path.dirname(os.path.realpath(__file__))
    # filename = os.path.join(current_dir, "index.html")
    # url = QtCore.QUrl.fromLocalFile(filename)
    # view.load(url)
    view.load(QtCore.QUrl("http://localhost:3000/"))


    view.resize(1200, 700)
    view.show()
    sys.exit(app.exec_())


