package classearch.search.API;

import io.vertx.core.json.JsonObject;

import java.util.List;
import java.util.Objects;

final class Term {
    private final String term;
    private final List<Meeting> meetingList;

    private Term(String term, List<Meeting> meetingList){
        this.term = term;
        this.meetingList = meetingList;
    }

    static final Term of(JsonObject term){
        Objects.requireNonNull(json, "json can not be null");




    }


    private class Meeting implements Comparable<Meeting>{
        private int final String CODE;
        private int final String ROOM;
        private int final int NUMBER;
        private int final String DAYTIME;
        private int final String INSTRUCTOR;

        private Meeting(String code, String room, int number, String daytime, String instructor) {
            CODE = code;
            ROOM = room;
            NUMBER = number;
            DAYTIME = daytime;
            INSTRUCTOR = instructor;
        }

        public String getCODE() {
            return CODE;
        }

        public String getROOM() {
            return ROOM;
        }

        public int getNUMBER() {
            return NUMBER;
        }

        public String getDAYTIME() {
            return DAYTIME;
        }

        public String getINSTRUCTOR() {
            return INSTRUCTOR;
        }

        @Override
        public int compareTo(Meeting meeting) {
            return Integer.compare(this.NUMBER, meeting.NUMBER);
        }
    }




}
