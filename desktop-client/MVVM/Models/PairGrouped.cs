using System.Collections.Generic;

namespace MVVM.Models;

public class PairGrouped
{
    private readonly Dictionary<Time, List<Pair>> _groupedPairs = new ();

    public void Add(Time key, List<Pair> pairs)
    {
        _groupedPairs.Add(key, pairs);
    }
    public List<Pair> Get(Time key)
    {
        return _groupedPairs.GetValueOrDefault(key);
    }
    
    public int Count => _groupedPairs.Count;
    public Dictionary<Time, List<Pair>>.KeyCollection Keys => _groupedPairs.Keys;
}