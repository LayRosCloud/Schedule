using System.Collections.Generic;

namespace MVVM.Models;

public class DayOfWeekGrouped
{
    private readonly Dictionary<DayOfWeek, PairGrouped> _groupedPairs = new ();

    public void Add(DayOfWeek key, PairGrouped pairs)
    {
        _groupedPairs.Add(key, pairs);
    }
    public PairGrouped Get(DayOfWeek key)
    {
        return _groupedPairs.GetValueOrDefault(key);
    }

    public int Count => _groupedPairs.Count;
}