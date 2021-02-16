# import mysql.connector
import json
import sys
import sqlite3

class Database:
    def __init__(self):
        self.db = sqlite3.connect('data.db')
        self.db.row_factory = sqlite3.Row
        self.cursor = self.db.cursor()
    
    def select(self,table,clause=""):
        self.cursor.execute('SELECT * FROM '+str(table)+' '+str(clause))
        result = self.cursor.fetchall()
        response = []
        for row in result:
            # print(dict(row))
            response.append(dict(row))
        return response

    def selectQuery(self,sql):
        self.cursor.execute(sql)
        result = self.cursor.fetchall()
        response = []
        for row in result:
            response.append(dict(row))
        return response

    def addCategory(self,values):
        self.cursor.execute("INSERT INTO categories(category) VALUES (?)",values)
        self.db.commit()
        return self.cursor.lastrowid

    def updateCategory(self,values):
        self.cursor.execute("UPDATE categories SET category = ?  WHERE id = ?",values)
        self.db.commit()

    def delete(self,table,values):
        self.cursor.execute("DELETE FROM "+str(table)+" WHERE id=?",values)
        self.db.commit()

    def updateNote(self,payload):
        self.cursor.execute("UPDATE notesColor SET note_title = ?,note_body = ?  WHERE id = ?",payload)
        self.db.commit()

    def addNotes(self,values):
        self.cursor.execute("INSERT INTO notesColor(note_title,note_body,note_category,color) VALUES (?,?,?,?)",values)
        self.db.commit()
        return self.cursor.lastrowid
        

    # def query(self,sql):
    #     self.cursor.execute(sql)
    #     result = self.cursor.fetchall()
    #     # print(result)
    #     return result
    
    # def addOne(self,comp_id,game_id,game_date,home_id,home_name,home_score,home_data,away_id,away_name,away_score,away_data):
    #     sql = "INSERT INTO games (comp_id,game_id,game_date,home_id,home_name,home_score,home_data,away_id,away_name,away_score,away_data) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
    #     val = (comp_id,game_id,game_date,home_id,home_name,home_score,home_data,away_id,away_name,away_score,away_data)

    #     self.cursor.execute(sql, val)

    #     self.db.commit()

    #     print(self.cursor.rowcount, "record inserted.")

    # def addMultiple(self,data):
    #     sql = "INSERT INTO games3 (comp_id,stage,game_id,game_date,home_id,home_name,home_score,home_data,away_id,away_name,away_score,away_data) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
    #     data = json.loads(data)
    #     d = []
    #     for i in range(0,len(data),1):
    #         if data[i]:
    #             home_data =  json.dumps(data[i]["home_data"])
    #             away_data =  json.dumps(data[i]["away_data"])
    #             vals = (data[i]["comp_id"],data[i]["stage"],data[i]["game_id"],data[i]["game_date"],data[i]["home_id"],data[i]["home_name"],data[i]["home_score"],home_data,data[i]["away_id"],data[i]["away_name"],data[i]["away_score"],away_data)
    #             d.append(vals)
        
        
    #     # print(data[0]["home_data"]["penalties"])
    #     # print(d)
    #     # sys.exit()

    #     self.cursor.executemany(sql, d)

    #     self.db.commit()

    #     print(self.cursor.rowcount, "record inserted.")
    
    # def addPosition(self,team_id,stage,pos):
    #     sql = "INSERT  INTO positionteams (team_id,stage,position) VALUES (%s, %s, %s)"
    #     val = (team_id,stage,pos)

    #     self.cursor.execute(sql, val)

    #     self.db.commit()
    
    def __del__(self):
        self.db.close()