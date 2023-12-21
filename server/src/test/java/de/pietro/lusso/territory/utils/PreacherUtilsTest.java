package de.pietro.lusso.territory.utils;

import de.pietro.lusso.territory.domain.Preacher;
import org.junit.Assert;
import org.junit.Test;

import java.util.ArrayList;
import java.util.List;

public class PreacherUtilsTest {

    @Test
    public void testSimilarNames() {
        List<Preacher> list = new ArrayList<>();
        Preacher p0 = new Preacher();
        p0.setName("Jim Maria");
        Preacher p1 = new Preacher();
        p1.setName("John Dude");
        Preacher p2 = new Preacher();
        p2.setName("John Duo");
        Preacher p3 = new Preacher();
        p3.setName("John Dual");
        Preacher p4 = new Preacher();
        p4.setName("John Maria");
        Preacher p5 = new Preacher();
        p5.setName("John Maria");
        p5.setShortName("JoMa");
        list.add(p0);
        list.add(p1);
        list.add(p2);
        list.add(p3);
        list.add(p4);
        list.add(p5);

        PreacherUtils.setShortNames(list);

        for (Preacher preacher : list) {
            System.out.println(preacher.getShortName());
        }

        Assert.assertEquals("JiMa", list.get(0).getShortName());
        Assert.assertEquals("JoDu", list.get(1).getShortName());
        Assert.assertEquals("JoDu1", list.get(2).getShortName());
        Assert.assertEquals("JoDu2", list.get(3).getShortName());
        Assert.assertEquals("JoMa1", list.get(4).getShortName());
        Assert.assertEquals("JoMa", list.get(5).getShortName());
    }
}
