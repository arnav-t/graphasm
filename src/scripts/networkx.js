export const script = (directed, format, data) => {
  let readCommand = ''
  switch (format) {
  case 'Edge List':
    readCommand = 'G.add_edges_from(data)';
    break;
  case 'Adjacency List':
    readCommand = 'G.add_edges_from(toEdgeList(data))'
    break;
  case 'Weighted Edge List':
    readCommand = `
  G.add_weighted_edges_from(data)
  edge_labels = {}
  for e in data:
    edge_labels[(e[0],e[1])] = e[2]
    `;
    break;
  default:
    readCommand = 'G = nx.from_numpy_matrix(np.asarray(data), create_using=G)'
  }

  const py = `
  import networkx as nx
  __import__('os').environ['MPLBACKEND'] = 'AGG'
  import matplotlib.pyplot as plt
  import numpy as np
  import io, base64

  def toEdgeList(adjl):
    edges = []
    for i, l in enumerate(adjl):
      for j in l:
        edges.append([i, j])
    return edges

  data = ${data} 
  G = nx.${directed ? 'Di' : ''}Graph()
  edge_labels = {}
  ${readCommand}
  plt.clf()
  plt.box(False)
  layout = nx.spring_layout(G)
  nx.draw_networkx(G, alpha=1, pos=layout)
  nx.draw_networkx_edge_labels(G, pos=layout, edge_labels=edge_labels)
  buf = io.BytesIO()
  plt.savefig(buf, format='png')
  buf.seek(0)
  'data:image/png;base64,' + base64.b64encode(buf.read()).decode('UTF-8')
  `;
  return py;
};